import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, X, ImagePlus, Send } from "lucide-react";
import { toast } from "sonner";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

type FormDataState = {
  ownerName: string;
  phone: string;
  email: string;
  propertyType: string;
  city: string;
  expectedPrice: string;
  propertySize: string;
  preferredContactTime: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormDataState | "images", string>>;

const MAX_FILES = 20;
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const INITIAL_FORM_STATE: FormDataState = {
  ownerName: "",
  phone: "",
  email: "",
  propertyType: "",
  city: "",
  expectedPrice: "",
  propertySize: "",
  preferredContactTime: "",
  message: "",
};

const SellPropertyForm = () => {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_STATE);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 82%",
          },
        }
      );
    },
    { scope: formRef, dependencies: [prefersReducedMotion] }
  );

  const previews = useMemo(
    () => images.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [images]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const setField = <K extends keyof FormDataState>(field: K, value: FormDataState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors: FieldErrors = {};

    if (!formData.ownerName.trim()) nextErrors.ownerName = "Owner name is required.";
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[+\d\s()-]{8,}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.propertyType) nextErrors.propertyType = "Select a property type.";
    if (!formData.city.trim()) nextErrors.city = "City or location is required.";
    if (!formData.expectedPrice.trim()) nextErrors.expectedPrice = "Expected price is required.";
    if (!formData.propertySize.trim()) nextErrors.propertySize = "Property size is required.";
    if (!formData.preferredContactTime) {
      nextErrors.preferredContactTime = "Choose a preferred contact time.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Please share a short property description.";
    }

    if (images.length === 0) {
      nextErrors.images = "Upload at least one property image.";
    }

    return nextErrors;
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const accepted: File[] = [];
    const rejected: string[] = [];

    selected.forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        rejected.push(`${file.name}: unsupported format`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        rejected.push(`${file.name}: larger than 8MB`);
        return;
      }

      if (images.length + accepted.length >= MAX_FILES) {
        rejected.push(`${file.name}: upload limit reached (${MAX_FILES})`);
        return;
      }

      accepted.push(file);
    });

    if (accepted.length) {
      setImages((prev) => [...prev, ...accepted]);
      setErrors((prev) => ({ ...prev, images: undefined }));
    }

    if (rejected.length) {
      toast.error(`Some images were skipped. ${rejected[0]}`);
    }

    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please complete all required fields before submitting.");
      return;
    }

    const payload = {
      ...formData,
      images: images.map((file) => ({
        name: file.name,
        type: file.type,
        sizeMB: Number((file.size / (1024 * 1024)).toFixed(2)),
      })),
      submittedAt: new Date().toISOString(),
      source: "sell-property-page",
    };

    console.log("Sell property lead:", payload);
    toast.success("Property submitted. Our advisory team will contact you shortly.");

    setFormData(INITIAL_FORM_STATE);
    setImages([]);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 bg-white border border-[#d9cfbd] text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a96e]/50 transition-all duration-300";

  const labelClass =
    "mb-2 block text-[11px] uppercase tracking-[0.16em] text-gray-600";

  const errorClass = "mt-1 text-[11px] text-red-600";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sell-owner-name" className={labelClass}>Owner Name *</label>
          <input
            id="sell-owner-name"
            type="text"
            value={formData.ownerName}
            onChange={(e) => setField("ownerName", e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />
          {errors.ownerName && <p className={errorClass}>{errors.ownerName}</p>}
        </div>

        <div>
          <label htmlFor="sell-phone" className={labelClass}>Phone Number *</label>
          <input
            id="sell-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="+91 98XXXXXXXX"
            className={inputClass}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="sell-email" className={labelClass}>Email *</label>
          <input
            id="sell-email"
            type="email"
            value={formData.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="name@email.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="sell-property-type" className={labelClass}>Property Type *</label>
          <select
            id="sell-property-type"
            value={formData.propertyType}
            onChange={(e) => setField("propertyType", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select property type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial Space</option>
            <option value="agricultural">Agricultural Land</option>
            <option value="other">Other</option>
          </select>
          {errors.propertyType && <p className={errorClass}>{errors.propertyType}</p>}
        </div>

        <div>
          <label htmlFor="sell-city" className={labelClass}>City / Location *</label>
          <input
            id="sell-city"
            type="text"
            value={formData.city}
            onChange={(e) => setField("city", e.target.value)}
            placeholder="Sector / Area / City"
            className={inputClass}
          />
          {errors.city && <p className={errorClass}>{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="sell-expected-price" className={labelClass}>Expected Price *</label>
          <input
            id="sell-expected-price"
            type="text"
            value={formData.expectedPrice}
            onChange={(e) => setField("expectedPrice", e.target.value)}
            placeholder="e.g. INR 1.75 Cr"
            className={inputClass}
          />
          {errors.expectedPrice && <p className={errorClass}>{errors.expectedPrice}</p>}
        </div>

        <div>
          <label htmlFor="sell-property-size" className={labelClass}>Property Size *</label>
          <input
            id="sell-property-size"
            type="text"
            value={formData.propertySize}
            onChange={(e) => setField("propertySize", e.target.value)}
            placeholder="e.g. 2400 sq ft"
            className={inputClass}
          />
          {errors.propertySize && <p className={errorClass}>{errors.propertySize}</p>}
        </div>

        <div>
          <label htmlFor="sell-preferred-time" className={labelClass}>Preferred Contact Time *</label>
          <select
            id="sell-preferred-time"
            value={formData.preferredContactTime}
            onChange={(e) => setField("preferredContactTime", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Choose contact slot</option>
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (4 PM - 8 PM)</option>
            <option value="anytime">Anytime</option>
          </select>
          {errors.preferredContactTime && (
            <p className={errorClass}>{errors.preferredContactTime}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="sell-message" className={labelClass}>Property Description *</label>
        <textarea
          id="sell-message"
          rows={4}
          value={formData.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="Share key highlights: furnishing, facing, age, occupancy, amenities, and urgency."
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <div className="mt-6 border border-dashed border-[#cfbe9e] bg-[#fbf8f2] p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center bg-[#f1e5cf] text-[#8f7442]">
              <ImagePlus size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Upload Property Images *</p>
              <p className="text-xs text-gray-600">
                JPG, PNG, or WebP. Up to {MAX_FILES} images, max 8MB each.
              </p>
            </div>
          </div>

          <label
            htmlFor="sell-images"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#c9a96e]/50 text-[#8f7442] text-xs uppercase tracking-[0.14em] font-semibold cursor-pointer hover:bg-white transition-colors"
          >
            <Upload size={13} />
            Add Images
          </label>
          <input
            ref={fileInputRef}
            id="sell-images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImagesChange}
            className="hidden"
          />
        </div>

        <div className="mt-3 text-xs text-gray-600">
          {images.length} / {MAX_FILES} images selected
        </div>
        {errors.images && <p className={errorClass}>{errors.images}</p>}

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {previews.map((preview, index) => (
              <div key={`${preview.file.name}-${index}`} className="relative group border border-[#dfd3be] bg-white">
                <img
                  src={preview.url}
                  alt={preview.file.name}
                  className="h-24 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove ${preview.file.name}`}
                  className="absolute top-1 right-1 h-10 w-10 md:h-7 md:w-7 rounded-full bg-black/70 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <X size={13} />
                </button>
                <p className="p-2 text-[10px] text-gray-600 truncate">{preview.file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-600 leading-relaxed">
        Once submitted, our team reviews your details and connects with you for valuation and go-to-market strategy.
      </p>

      <button
        type="submit"
        className="mt-6 w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c9a96e] text-[#1f180d] text-xs font-bold tracking-[0.18em] uppercase border border-[#b8924f] hover:bg-[#d2b57d] transition-all duration-500 shadow-[0_10px_24px_rgba(201,169,110,0.22)]"
      >
        Submit Property
        <Send size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};

export default SellPropertyForm;
