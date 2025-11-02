"use client";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone";

export default function UploadProfilePicture({ setUrl }: { setUrl: (url: string) => void }) {
    const [uploading, setUploading] = useState(false);

    const handleDrop = async (acceptedFiles: File[]) => {
        if (!acceptedFiles || acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        const user = getAuth().currentUser;
        if (!user) return alert("You must be logged in");

        const idToken = await user.getIdToken();

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const res = await fetch("/api/profile-picture-upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${idToken}` },
                body: formData,
            });

            const data = await res.json();

            if (data.url) {
                setUrl(data.url);
                alert("✅ Profile picture uploaded successfully!");
            } else {
                console.error(data.error);
                alert("Upload failed.");
            }
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <Dropzone
                accept={{ "image/*": [] }}
                maxFiles={1}
                maxSize={10* 1024 * 1024}
                onDrop={handleDrop}
                onError={console.error}
            >
                        <DropzoneEmptyState />
                        <DropzoneContent />

            </Dropzone>

            {uploading && <p className="text-sm text-gray-400">Uploading...</p>}
        </div>
    );
}
