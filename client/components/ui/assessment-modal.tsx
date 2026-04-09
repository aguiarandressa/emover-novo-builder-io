import {
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type HTMLInputTypeAttribute,
} from "react";
import { cn } from "@/lib/utils";

type PreferredShift = "qualquer" | "manha" | "tarde" | "noite";

interface AssessmentFormData {
  guardianName: string;
  phone: string;
  email: string;
  patientName: string;
  patientAge: string;
  preferredShifts: PreferredShift[];
  attachments: File[];
  acceptedPrivacy: boolean;
  acceptedHealthData: boolean;
}

interface FormErrors {
  guardianName?: string;
  phone?: string;
  email?: string;
  patientName?: string;
  patientAge?: string;
  preferredShifts?: string;
  acceptedPrivacy?: string;
  acceptedHealthData?: string;
}

export interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: AssessmentFormData) => void;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
}

const SHIFT_OPTIONS: Array<{ label: string; value: PreferredShift }> = [
  { label: "Qualquer horário", value: "qualquer" },
  { label: "Manhã", value: "manha" },
  { label: "Tarde", value: "tarde" },
  { label: "Noite", value: "noite" },
];

const INITIAL_STATE: AssessmentFormData = {
  guardianName: "",
  phone: "",
  email: "",
  patientName: "",
  patientAge: "",
  preferredShifts: ["qualquer"],
  attachments: [],
  acceptedPrivacy: false,
  acceptedHealthData: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LETTERS_ONLY_REGEX = /^[A-Za-zÀ-ÿ\s]+$/;

function validateForm(data: AssessmentFormData): FormErrors {
  const errors: FormErrors = {};

  const guardianName = data.guardianName.trim();
  const patientName = data.patientName.trim();
  const phoneDigits = data.phone.replace(/\D/g, "");
  const email = data.email.trim();
  const ageText = data.patientAge.trim();
  const ageNumber = Number(ageText);

  if (!guardianName) {
    errors.guardianName = "Informe o nome do responsável.";
  } else if (!LETTERS_ONLY_REGEX.test(guardianName)) {
    errors.guardianName = "Digite apenas letras no nome do responsável.";
  }

  if (!phoneDigits) {
    errors.phone = "Informe o telefone / WhatsApp.";
  } else if (phoneDigits.length !== 11) {
    errors.phone = "Digite um telefone válido com 11 números.";
  }

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = "Digite um e-mail válido.";
  }

  if (!patientName) {
    errors.patientName = "Informe o nome do paciente.";
  } else if (!LETTERS_ONLY_REGEX.test(patientName)) {
    errors.patientName = "Digite apenas letras no nome do paciente.";
  }

  if (!ageText) {
    errors.patientAge = "Informe a idade do paciente.";
  } else if (!/^\d+$/.test(ageText)) {
    errors.patientAge = "A idade deve conter apenas números.";
  } else if (ageNumber < 0 || ageNumber > 120) {
    errors.patientAge = "A idade deve estar entre 0 e 120.";
  }

  if (data.preferredShifts.length === 0) {
    errors.preferredShifts = "Selecione ao menos um turno.";
  }

  if (!data.acceptedPrivacy) {
    errors.acceptedPrivacy = "Você precisa aceitar a Política de Privacidade.";
  }

  if (!data.acceptedHealthData) {
    errors.acceptedHealthData =
      "Você precisa autorizar o envio de dados de saúde para análise.";
  }

  return errors;
}

function sanitizeName(value: string) {
  const cleaned = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
  return cleaned.replace(/\s{2,}/g, " ").trimStart();
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(
    3,
    7,
  )}-${digits.slice(7, 11)}`;
}

export function AssessmentModal({
  isOpen,
  onClose,
  onSubmit,
  logoSrc = "/logo.png",
  logoAlt = "Logo Emover",
  className,
}: AssessmentModalProps) {
  const [formData, setFormData] = useState<AssessmentFormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dialogTitleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_STATE);
      setErrors({});
      setHasSubmitted(false);
      setSubmitted(false);
    }
  }, [isOpen]);

  const hasLogo = useMemo(() => logoSrc.trim().length > 0, [logoSrc]);

  if (!isOpen) return null;

  const updateField = <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K],
  ) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);

    if (hasSubmitted) {
      setErrors(validateForm(nextData));
    }
  };

  const toggleShift = (shift: PreferredShift) => {
    const current = formData.preferredShifts;
    const exists = current.includes(shift);

    let nextShifts: PreferredShift[];

    if (exists) {
      nextShifts = current.filter((item) => item !== shift);
    } else if (shift === "qualquer") {
      nextShifts = ["qualquer"];
    } else {
      nextShifts = current.filter((item) => item !== "qualquer");
      nextShifts = [...nextShifts, shift];
    }

    updateField("preferredShifts", nextShifts);
  };

  const handleAttachmentChange = (filesList: FileList | null) => {
    const incomingFiles = Array.from(filesList ?? []);
    const combined = [...formData.attachments, ...incomingFiles].slice(0, 5);
    updateField("attachments", combined);
  };

  const removeAttachment = (indexToRemove: number) => {
    updateField(
      "attachments",
      formData.attachments.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasSubmitted(true);
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit?.(formData);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/55 px-3 py-4 sm:px-4 sm:py-6"
      onClick={handleClose}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-describedby={descriptionId}
        className={cn(
          "w-full max-w-[340px] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_70px_-22px_rgba(15,23,42,0.45)] sm:max-w-[720px] lg:max-w-[920px]",
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative border-b border-slate-100 px-4 py-4 sm:px-8 sm:py-5">
          <button
            type="button"
            aria-label="Fechar modal"
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>

          <div className="mx-auto flex w-full items-center justify-center">
  {hasLogo ? (
    <img
      src={logoSrc}
      alt={logoAlt}
      className="
        block
        h-auto
        w-auto
        max-h-[32px]
        max-w-[140px]
        object-contain
        sm:max-h-[40px]
        sm:max-w-[180px]
        md:max-h-[48px]
        md:max-w-[220px]
        lg:max-h-[56px]
        lg:max-w-[260px]
      "
    />
  ) : (
    <span className="text-xl font-bold tracking-tight text-[#1b5f80] sm:text-2xl">
      Emover
    </span>
  )}
</div>
         
        </div>

        {submitted ? (
          <div className="bg-[#fbfcfd] px-5 py-10 text-center sm:px-8 sm:py-14">
            <h2
              id={dialogTitleId}
              className="mb-3 text-[26px] font-extrabold leading-tight text-[#1c5573] sm:text-[32px]"
            >
              Recebemos sua solicitação! 💙
            </h2>

            <p className="mx-auto max-w-[560px] text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
              Em breve, nossa equipe entrará em contato para confirmar o
              atendimento.
              <br />
              Este envio não garante o agendamento, mas já agiliza todo o
              processo.
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="h-[46px] rounded-[10px] bg-gradient-to-r from-[#2fc0cb] to-[#0a94ab] px-6 text-[15px] font-semibold text-white shadow-[0_12px_24px_-14px_rgba(7,139,162,0.8)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ab4c4] focus-visible:ring-offset-2"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#fbfcfd] px-4 py-5 sm:px-8 sm:py-7"
            noValidate
          >
            <h2
              id={dialogTitleId}
              className="mb-3 text-[24px] font-extrabold leading-tight text-[#1c5573] sm:text-[34px]"
            >
              Solicite Atendimento
            </h2>

            <p
              id={descriptionId}
              className="mb-5 max-w-[680px] text-[14px] leading-relaxed text-slate-500 sm:mb-6 sm:text-[15px]"
            >
              Preencha o formulário e envie sua solicitação de atendimento.
              <br className="hidden sm:block" />
              Nossa equipe multidisciplinar irá analisar seu caso com atenção e
              entrará em contato para os próximos passos.
            </p>

            <div className="space-y-4 sm:space-y-5">
              <Field
                id="guardianName"
                label="Nome do responsável *"
                placeholder="Ex: Maria Silva"
                value={formData.guardianName}
                onChange={(value) =>
                  updateField("guardianName", sanitizeName(value))
                }
                error={hasSubmitted ? errors.guardianName : undefined}
              />

              <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-x-6">
                <Field
                  id="phone"
                  label="Telefone / WhatsApp *"
                  placeholder="(00) 0 0000-0000"
                  value={formData.phone}
                  onChange={(value) => updateField("phone", formatPhone(value))}
                  inputMode="numeric"
                  error={hasSubmitted ? errors.phone : undefined}
                />

                <Field
                  id="email"
                  type="email"
                  label="E-mail"
                  placeholder="contato@exemplo.com"
                  value={formData.email}
                  onChange={(value) => updateField("email", value.trimStart())}
                  error={hasSubmitted ? errors.email : undefined}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1fr_220px] lg:gap-x-6">
                <Field
                  id="patientName"
                  label="Nome do Paciente *"
                  placeholder="Ex: João Silva"
                  value={formData.patientName}
                  onChange={(value) =>
                    updateField("patientName", sanitizeName(value))
                  }
                  error={hasSubmitted ? errors.patientName : undefined}
                />

                <Field
                  id="patientAge"
                  label="Idade do Paciente *"
                  placeholder="Ex: 7"
                  value={formData.patientAge}
                  onChange={(value) =>
                    updateField(
                      "patientAge",
                      value.replace(/\D/g, "").slice(0, 3),
                    )
                  }
                  inputMode="numeric"
                  suffix="anos"
                  error={hasSubmitted ? errors.patientAge : undefined}
                />
              </div>
            </div>

            <fieldset className="mt-5 space-y-2.5">
              <legend className="mb-2 text-[15px] font-semibold text-[#1f3f54] sm:text-[16px]">
                Turno de Preferência
              </legend>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SHIFT_OPTIONS.map((option) => {
                  const checked = formData.preferredShifts.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleShift(option.value)}
                      className={cn(
                        "flex h-[44px] items-center justify-center rounded-[8px] border bg-white px-3 text-[14px] font-medium text-[#163a52] transition",
                        checked
                          ? "border-[#23b6c7] bg-[#f5fcfd]"
                          : "border-slate-200 hover:border-[#9edee6]",
                      )}
                      aria-pressed={checked}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {hasSubmitted && errors.preferredShifts ? (
                <p className="text-[12px] text-rose-500">
                  {errors.preferredShifts}
                </p>
              ) : null}
            </fieldset>

            <div className="mt-5 space-y-2">
              <label
                htmlFor="attachment"
                className="block text-[15px] font-semibold text-[#1f3f54] sm:text-[16px]"
              >
                Anexar Laudos ou Exames{" "}
                <span className="font-normal text-slate-500">(Opcional)</span>
              </label>

              <div className="rounded-[8px] border border-dashed border-slate-300 bg-white px-3 py-3 sm:px-4">
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  multiple
                  onChange={(event) => handleAttachmentChange(event.target.files)}
                  className="block w-full text-[13px] text-slate-700 file:mr-3 file:rounded-md file:border file:border-slate-300 file:bg-white file:px-3 file:py-1.5 file:text-[13px] file:font-medium file:text-slate-700 hover:file:bg-slate-50"
                />

                <p className="mt-2 text-[12px] text-slate-500">
                  Você pode anexar até 5 arquivos.
                </p>

                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-md border border-emerald-100 bg-emerald-50/60 px-3 py-2"
                      >
                        <div className="flex min-w-0 items-center gap-2 text-[13px] text-emerald-700">
                          <span aria-hidden="true">✔</span>
                          <span className="truncate">{file.name}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="shrink-0 text-sm font-semibold text-rose-500 transition hover:text-rose-600"
                          title="Remover arquivo"
                          aria-label={`Remover arquivo ${file.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <label
                  htmlFor="privacy"
                  className="inline-flex cursor-pointer items-start gap-2 text-[14px] font-semibold text-[#0f7f89] sm:text-[15px]"
                >
                  <input
                    id="privacy"
                    type="checkbox"
                    checked={formData.acceptedPrivacy}
                    onChange={(event) =>
                      updateField("acceptedPrivacy", event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#159fb4] focus:ring-[#159fb4]"
                  />
                  <span>
                    Li e aceito a{" "}
                    <a
                      href="/privacidade"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </span>
                </label>

                {hasSubmitted && errors.acceptedPrivacy ? (
                  <p className="mt-1 text-[12px] text-rose-500">
                    {errors.acceptedPrivacy}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="health-data"
                  className="inline-flex cursor-pointer items-start gap-2 text-[14px] font-semibold text-[#0f7f89] sm:text-[15px]"
                >
                  <input
                    id="health-data"
                    type="checkbox"
                    checked={formData.acceptedHealthData}
                    onChange={(event) =>
                      updateField("acceptedHealthData", event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#159fb4] focus:ring-[#159fb4]"
                  />
                  <span>Autorizo o envio de dados de saúde para análise.</span>
                </label>

                {hasSubmitted && errors.acceptedHealthData ? (
                  <p className="mt-1 text-[12px] text-rose-500">
                    {errors.acceptedHealthData}
                  </p>
                ) : null}
              </div>

              <p className="max-w-[760px] text-[12px] leading-relaxed text-slate-500 sm:text-[13px]">
                Seus dados serão utilizados para análise inicial, organização do
                atendimento e contato da equipe responsável.
              </p>
            </div>

            <div className="pt-5 text-center">
              <button
                type="submit"
                className="h-[48px] w-full rounded-[10px] bg-gradient-to-r from-[#2fc0cb] to-[#0a94ab] px-6 text-[16px] font-semibold text-white shadow-[0_12px_24px_-14px_rgba(7,139,162,0.8)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ab4c4] focus-visible:ring-offset-2 sm:w-[300px]"
              >
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
  inputMode?: HTMLInputElement["inputMode"];
  suffix?: string;
  error?: string;
}

function Field({
  id,
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  inputMode,
  suffix,
  error,
}: FieldProps) {
  const hasError = Boolean(error);

  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[15px] font-semibold text-[#1f3f54] sm:text-[16px]">
        {label}
      </span>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-[46px] w-full rounded-[8px] border bg-white px-4 text-[15px] text-[#163a52] outline-none transition placeholder:text-slate-400 focus:ring-2",
            suffix ? "pr-16" : "",
            hasError
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
              : "border-slate-200 focus:border-[#3cc0d0] focus:ring-[#3cc0d0]/20",
          )}
        />

        {suffix ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>

      {hasError ? (
        <p className="mt-1 text-[12px] text-rose-500">{error}</p>
      ) : null}
    </label>
  );
}