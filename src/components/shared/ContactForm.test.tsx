import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("@/lib/gsap-config", () => ({
  default: {
    timeline: () => ({
      fromTo: vi.fn(),
    }),
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

import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("submits contact form and shows success toast", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, message: "ok" }),
    } as Response);

    render(<ContactForm showLabels />);

    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "Abhishek" } });
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Malhotra" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "+91 9000000000" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "lead@example.com" } });
    fireEvent.change(screen.getByLabelText("Real Estate Interest"), { target: { value: "residential" } });
    fireEvent.change(screen.getByLabelText("City"), { target: { value: "Chandigarh" } });
    fireEvent.change(screen.getByLabelText("Your Message"), { target: { value: "Need premium 4BHK options" } });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/contact");
    expect(options.method).toBe("POST");

    const payload = JSON.parse(String(options.body));
    expect(payload).toMatchObject({
      firstName: "Abhishek",
      lastName: "Malhotra",
      phone: "+91 9000000000",
      email: "lead@example.com",
      interest: "residential",
      city: "Chandigarh",
      message: "Need premium 4BHK options",
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith("Thank you! We have received your message.");
    });

    expect(screen.getByLabelText("First Name")).toHaveValue("");
    expect(screen.getByLabelText("Last Name")).toHaveValue("");
    expect(screen.getByLabelText("Email Address")).toHaveValue("");
  });

  it("shows API error when contact submit fails", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ ok: false, error: "Unable to deliver email at the moment." }),
    } as Response);

    render(<ContactForm showLabels />);

    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "B" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "lead@example.com" } });
    fireEvent.change(screen.getByLabelText("Real Estate Interest"), { target: { value: "commercial" } });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Unable to deliver email at the moment.");
    });
  });
});
