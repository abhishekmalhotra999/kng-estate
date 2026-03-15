import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("@/lib/gsap-config", () => ({
  default: {
    fromTo: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: (callback: () => void) => {
    callback();
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

import SellPropertyForm from "./SellPropertyForm";

describe("SellPropertyForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:test-url"),
      revokeObjectURL: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const fillRequiredFields = () => {
    fireEvent.change(screen.getByLabelText("Owner Name *"), { target: { value: "Abhishek Malhotra" } });
    fireEvent.change(screen.getByLabelText("Phone Number *"), { target: { value: "+91 9876543210" } });
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "owner@example.com" } });
    fireEvent.change(screen.getByLabelText("Property Type *"), { target: { value: "villa" } });
    fireEvent.change(screen.getByLabelText("City / Location *"), { target: { value: "Mohali" } });
    fireEvent.change(screen.getByLabelText("Expected Price *"), { target: { value: "INR 2 Cr" } });
    fireEvent.change(screen.getByLabelText("Property Size *"), { target: { value: "3500 sq ft" } });
    fireEvent.change(screen.getByLabelText("Preferred Contact Time *"), { target: { value: "evening" } });
    fireEvent.change(screen.getByLabelText("Property Description *"), {
      target: { value: "Independent villa, premium location." },
    });
  };

  it("rejects unsupported image type and shows error toast", async () => {
    render(<SellPropertyForm />);

    const fileInput = screen.getByLabelText("Add Images") as HTMLInputElement;
    const badFile = new File(["bad"], "doc.pdf", { type: "application/pdf" });

    fireEvent.change(fileInput, { target: { files: [badFile] } });

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Some images were skipped. doc.pdf: unsupported format");
    });

    expect(screen.getByText("0 / 20 images selected")).toBeInTheDocument();
  });

  it("requires at least one image before submit", async () => {
    render(<SellPropertyForm />);

    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: "Submit Property" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Please complete all required fields before submitting.");
    });

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Upload at least one property image.")).toBeInTheDocument();
  });

  it("submits form with multipart payload and uploaded files", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<SellPropertyForm />);

    fillRequiredFields();

    const fileInput = screen.getByLabelText("Add Images") as HTMLInputElement;
    const image = new File(["image"], "villa.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [image] } });

    expect(screen.getByText("1 / 20 images selected")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit Property" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/sell-property");
    expect(options.method).toBe("POST");

    expect(options.body).toBeInstanceOf(FormData);
    const payload = options.body as FormData;
    expect(payload.get("ownerName")).toBe("Abhishek Malhotra");
    expect(payload.get("city")).toBe("Mohali");
    const files = payload.getAll("images") as File[];
    expect(files).toHaveLength(1);
    expect(files[0].name).toBe("villa.jpg");
    expect(files[0].type).toBe("image/jpeg");

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith(
        "Property submitted. Our advisory team will contact you shortly."
      );
    });

    expect(screen.getByText("0 / 20 images selected")).toBeInTheDocument();
  });
});
