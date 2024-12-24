"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `DEVELOPER`;

export default function TextGenerate() {
    return <TextGenerateEffect words={words} />;
}
