"use client";

import { Eraser, Signature } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

import { Button } from "@/components/ui/button";

export function SignatureField({ value, onChange }: ControllerRenderProps) {
  const signaturePad = useRef<SignatureCanvas>(null);

  const signatureValue = value as string;

  const [isEditingSignature, setIsEditingSignature] = useState(!signatureValue);

  const handleClearSignature = () => {
    signaturePad.current?.clear();
    onChange("");
  };

  const handleEndSignature = () => {
    if (signaturePad.current) {
      if (!signaturePad.current.isEmpty()) {
        const signatureData = signaturePad.current.toDataURL("image/png");
        onChange(signatureData);
      } else {
        onChange("");
      }
    }
  };

  const handleEditSignature = () => {
    setIsEditingSignature(true);
    onChange("");
  };

  return (
    <>
      {isEditingSignature ? (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "33.33%",
            }}
          >
            <SignatureCanvas
              ref={signaturePad}
              onEnd={handleEndSignature}
              canvasProps={{
                className:
                  "signature-canvas border rounded-md absolute top-0 left-0 w-full h-full bg-white",
              }}
            />
          </div>
          <Button type="button" onClick={handleClearSignature}>
            Clear
            <Eraser />
          </Button>
        </>
      ) : (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "33.33%",
            }}
          >
            <Image
              src={signatureValue}
              alt="Saved signature"
              layout="fill"
              objectFit="contain"
              className="rounded-md border bg-white"
            />
          </div>
          <Button type="button" onClick={handleEditSignature}>
            Edit
            <Signature />
          </Button>
        </>
      )}
    </>
  );
}
