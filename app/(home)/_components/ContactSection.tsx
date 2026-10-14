"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertCircle, Check, Copy, MapPin, Phone, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { EMAIL, LOCATION, PHONE, SOCIAL_LINKS, isEmail, sendMessage, type ContactMessage } from "../_data/contact";

const ease = [0.22, 1, 0.36, 1] as const;

// Left column lines slide in from the left, one after another
const slideIn = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

/* ─── Helpers ─── */

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${text}`;
    }
  };
  return { copied, copy };
}

function Socials({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
        >
          <FontAwesomeIcon icon={s.icon} />
        </a>
      ))}
    </div>
  );
}

/* ─── Form state ─── */

type Field = keyof ContactMessage;

interface ContactFormApi {
  form: ContactMessage;
  set: (field: Field, value: string) => void;
  valid: boolean;
  loading: boolean;
  submit: (e?: React.FormEvent) => Promise<void>;
}

function useContactForm(): ContactFormApi {
  const [form, setForm] = useState<ContactMessage>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const valid = Boolean(nameOk(form.name) && isEmail(form.email) && form.message.trim());
  const set = (field: Field, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!valid || loading) return;
    setLoading(true);
    try {
      await sendMessage(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Couldn't send. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return { form, set, valid, loading, submit };
}

/* ─── Form card: styled like an email compose window ─── */

const CHECK_DELAY = 600;
const MIN_NAME = 3;

const nameOk = (name: string) => name.trim().length >= MIN_NAME;

/** Lists what still blocks sending, e.g. "your name, a valid email and a message". */
function missingFields(form: ContactMessage) {
  const missing: string[] = [];
  if (!form.name.trim()) missing.push("your name");
  else if (!nameOk(form.name)) missing.push(`a name with at least ${MIN_NAME} characters`);
  if (!form.email.trim()) missing.push("your email");
  else if (!isEmail(form.email)) missing.push("a valid email");
  if (!form.message.trim()) missing.push("a message");
  if (missing.length <= 1) return missing.join("");
  return `${missing.slice(0, -1).join(", ")} and ${missing[missing.length - 1]}`;
}

/** True once `value` has been non-empty and unchanged for CHECK_DELAY ms; the setter lets onBlur mark it early. */
function useDebouncedCheck(value: string) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(false);
    if (!value.trim()) return;
    const id = setTimeout(() => setChecked(true), CHECK_DELAY);
    return () => clearTimeout(id);
  }, [value]);
  return [checked, setChecked] as const;
}

function FieldError({ id, show, children }: { id: string; show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.p
          id={id}
          role="alert"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 overflow-hidden px-5 pb-2.5 text-xs font-medium text-red-300 sm:pl-[5.25rem]"
        >
          <AlertCircle size={13} className="shrink-0" />
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function ComposeCard({ f }: { f: ContactFormApi }) {
  const row = "flex items-center gap-3 px-5 py-3 text-sm";
  const input = "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-white/25";
  const zone = (bad: boolean) =>
    cn("border-b transition-colors", bad ? "border-red-400/50 bg-red-400/[0.06]" : "border-white/[0.06]");

  // Only judge a field once the visitor pauses typing (or leaves it), not on every keystroke
  const [nameChecked, setNameChecked] = useDebouncedCheck(f.form.name);
  const [emailChecked, setEmailChecked] = useDebouncedCheck(f.form.email);

  // After a send attempt on an incomplete form, flag every field that still needs work
  const [attempt, setAttempt] = useState(0);
  const tried = attempt > 0;

  const nameEmpty = !f.form.name.trim();
  const nameShort = !nameEmpty && !nameOk(f.form.name);
  const emailEmpty = !f.form.email.trim();
  const emailInvalid = !emailEmpty && !isEmail(f.form.email);
  const messageEmpty = !f.form.message.trim();

  const nameError = (tried && nameEmpty) || ((nameChecked || tried) && nameShort);
  const emailError = (emailChecked || tried) && emailInvalid;
  const emailMissing = tried && emailEmpty;
  const messageError = tried && messageEmpty;

  const missing = missingFields(f.form);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.valid) {
      setAttempt((n) => n + 1);
      return;
    }
    setAttempt(0);
    f.submit();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="overflow-hidden rounded-2xl border border-white/[0.09] bg-card shadow-2xl">
      <div className="flex items-center justify-between bg-white/[0.04] px-5 py-3">
        <p className="text-sm font-semibold text-foreground">New message</p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors",
            f.loading
              ? "border-primary/30 bg-primary/10 text-primary"
              : f.valid
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-white/[0.1] text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              f.loading ? "animate-pulse bg-primary" : f.valid ? "bg-emerald-400" : "bg-white/30",
            )}
          />
          {f.loading ? "sending…" : f.valid ? "ready" : "draft"}
        </span>
      </div>

      <div className={cn(row, "border-b border-white/[0.06]")}>
        <span className="w-12 shrink-0 text-muted-foreground">To</span>
        <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-primary/15 py-0.5 pl-0.5 pr-3 text-primary">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
            S
          </span>
          <span className="truncate">{EMAIL}</span>
        </span>
      </div>

      <div className={zone(nameError)}>
        <label className={row}>
          <span className={cn("w-12 shrink-0", nameError ? "text-red-300" : "text-muted-foreground")}>From</span>
          <input
            className={input}
            placeholder="Your name"
            autoComplete="name"
            value={f.form.name}
            onChange={(e) => f.set("name", e.target.value)}
            onBlur={() => !nameEmpty && setNameChecked(true)}
            aria-invalid={nameError}
            aria-describedby={nameError ? "contact-name-error" : undefined}
          />
          {nameOk(f.form.name) && <Check size={15} className="shrink-0 text-emerald-400" />}
        </label>
        <FieldError id="contact-name-error" show={nameError}>
          {nameEmpty ? "Please add your name." : `Name should be at least ${MIN_NAME} characters.`}
        </FieldError>
      </div>

      <div className={zone(emailError || emailMissing)}>
        <label className={row}>
          <span className={cn("w-12 shrink-0", emailError || emailMissing ? "text-red-300" : "text-muted-foreground")}>
            Reply
          </span>
          <input
            className={input}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={f.form.email}
            onChange={(e) => f.set("email", e.target.value)}
            onBlur={() => !emailEmpty && setEmailChecked(true)}
            aria-invalid={emailError || emailMissing}
            aria-describedby={emailError || emailMissing ? "contact-email-error" : undefined}
          />
          {!emailEmpty && !emailInvalid && <Check size={15} className="shrink-0 text-emerald-400" />}
        </label>
        <FieldError id="contact-email-error" show={emailError || emailMissing}>
          {emailMissing
            ? "Please add your email so I can reply."
            : "That doesn't look like an email. Try something like name@example.com"}
        </FieldError>
      </div>

      <div className={cn("transition-colors", messageError && "bg-red-400/[0.06]")}>
        <textarea
          aria-label="Message"
          rows={8}
          placeholder="Write your message…"
          value={f.form.message}
          onChange={(e) => f.set("message", e.target.value)}
          aria-invalid={messageError}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className="block w-full resize-none bg-transparent px-5 py-4 text-sm leading-relaxed text-foreground outline-none placeholder:text-white/25"
        />
        <FieldError id="contact-message-error" show={messageError}>
          Please write a message.
        </FieldError>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/[0.06] px-5 py-3.5">
        <button
          type="submit"
          disabled={f.loading}
          aria-disabled={!f.valid || f.loading}
          aria-describedby="contact-send-hint"
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all",
            f.valid ? "hover:brightness-110" : "opacity-50",
          )}
        >
          {f.loading ? "Sending…" : "Send"}
          <Send size={14} />
        </button>

        <motion.p
          key={attempt}
          id="contact-send-hint"
          aria-live="polite"
          animate={tried && missing ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
          transition={{ duration: 0.4 }}
          className={cn(
            // Phones: the hint gets its own full-width line above Send; from sm it sits beside the button
            "order-first inline-flex min-w-0 basis-full items-center gap-2 text-sm font-medium sm:order-none sm:flex-1 sm:basis-auto",
            f.loading ? "text-muted-foreground" : missing ? (tried ? "text-red-300" : "text-amber-300") : "text-emerald-400",
          )}
        >
          {f.loading ? (
            "Sending your message…"
          ) : missing ? (
            <>
              <AlertCircle size={15} className="shrink-0" />
              <span>Add {missing} to send.</span>
            </>
          ) : (
            <>
              <Check size={15} className="shrink-0" />
              <span>Looks good, ready to send!</span>
            </>
          )}
        </motion.p>

        <span className="ml-auto font-mono text-[11px] text-white/30 sm:ml-0">{f.form.message.length} chars</span>
      </div>
    </form>
  );
}

/* ─── Section ─── */

export default function ContactSection(): JSX.Element {
  const f = useContactForm();
  const { copied, copy } = useCopy();

  return (
    <section id="contact-me" className="section-wrapper section-deepest relative z-20">
      <Toaster
        toastOptions={{
          duration: 4000,
          style: { background: "hsl(var(--card))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" },
        }}
      />
      <div className="section-container relative z-10">
        <SectionHeading index="06" label="contact" title="Get in touch" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="min-w-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.h3
              variants={slideIn}
              className="text-2xl font-black leading-[1.1] tracking-tight text-foreground md:text-4xl"
            >
              Got an idea? <br />
              <span className="gradient-text-animated">Let&apos;s talk.</span>
            </motion.h3>
            <motion.p variants={slideIn} className="mt-5 max-w-md text-muted-foreground">
              Have something in mind or just want to say hi? Drop a message. Good conversations about code, design, or a new idea
              are always welcome.
            </motion.p>

            <motion.div variants={slideIn} className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">Email me directly</p>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="min-w-0 break-all text-lg font-bold text-foreground underline decoration-primary/40 decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-xl md:text-2xl"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={() => copy(EMAIL)}
                  aria-label="Copy email"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.1] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={slideIn} className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <a href={PHONE.href} className="inline-flex items-center gap-2 hover:text-primary">
                <Phone size={15} className="text-primary" /> {PHONE.display}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-primary" /> {LOCATION}
              </span>
            </motion.div>

            <motion.div variants={slideIn}>
              <Socials className="mt-8" />
            </motion.div>
          </motion.div>

          {/* The compose window swings open on a hinge at its top edge */}
          <div className="min-w-0 [perspective:1400px]">
            <motion.div
              initial={{ opacity: 0, rotateX: -55, y: -30, scale: 0.92 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease, delay: 0.25 }}
              style={{ transformOrigin: "top center" }}
            >
              <ComposeCard f={f} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
