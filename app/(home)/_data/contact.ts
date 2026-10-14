import emailjs from "@emailjs/browser";
import {
  faFacebook,
  faLinkedin,
  faXTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export const EMAIL = "shahadg1983@gmail.com";
export const PHONE = { display: "+91 6398 223 144", href: "tel:+916398223144" };
export const LOCATION = "Shamli, U.P., India";

export const SOCIAL_LINKS = [
  { icon: faLinkedin, href: "https://www.linkedin.com/in/shahad-hassan-82287a220", label: "LinkedIn" },
  { icon: faGithub, href: "https://github.com/shahad-hassan19", label: "GitHub" },
  { icon: faXTwitter, href: "https://twitter.com/HassanShahad019", label: "X" },
  { icon: faInstagram, href: "https://www.instagram.com/shahad_chauhan019/", label: "Instagram" },
  { icon: faFacebook, href: "https://www.facebook.com/shahad.chauhangurjar.9", label: "Facebook" },
];

const EMAILJS_CONFIG = {
  serviceId: "service_x02jmrm",
  templateId: "template_czqjhqp",
  publicKey: "mv_jU07IPDEPAdBHe",
};

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Sends through the same EmailJS template the form used (fields: user_name, user_email, message). */
export function sendMessage({ name, email, message }: ContactMessage) {
  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    { user_name: name, user_email: email, message },
    EMAILJS_CONFIG.publicKey
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
