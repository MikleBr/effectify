import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { WidgetPlaceholder } from "@/components/WidgetPlaceholder";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

const LOCAL_STORAGE_KEY = "photo-widget-image-src";

interface PhotoWidgetProps {
  className?: string;
}

export function PhotoWidget({ className }: PhotoWidgetProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(() => {
    const storedImageSrc = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedImageSrc ? storedImageSrc : null;
  });

  const onChanePhoto = (src: string) => {
    setImageSrc(src);
    localStorage.setItem(LOCAL_STORAGE_KEY, src);
    setModalOpen(false);
  };

  return (
    <PhotoSettingsModal open={modalOpen} onOpenChange={setModalOpen} currentSrc={imageSrc || ''} onChanePhoto={onChanePhoto}>
      <Card className={cn('p-0 overflow-hidden flex items-center justify-center hover:brightness-90 transition-all cursor-pointer', className)}>
        {imageSrc !== null && (
          <img className="size-full object-cover" src={imageSrc} alt="Photo" />
        )}
        {imageSrc === null && (
          <WidgetPlaceholder
            Icon={ImageIcon}
            action={<Button variant="outline">Upload Photo</Button>}
          >
            No Photo{" "}
          </WidgetPlaceholder>
        )}
      </Card>
    </PhotoSettingsModal>
  );
}

type PhotoSettingsModalProps = React.PropsWithChildren<{
  open: boolean;
  currentSrc: string;
  onOpenChange: (open: boolean) => void;
  onChanePhoto: (src: string) => void;
}>;

function PhotoSettingsModal({ open, currentSrc, onOpenChange, onChanePhoto, children }: PhotoSettingsModalProps) {
  const [imageUrl, setImageUrl] = useState<string>(currentSrc);

  const handleAddPhoto = () => {
    if (imageUrl.trim()) {
      onChanePhoto(imageUrl);
    }
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Photo Editing</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <label htmlFor="image-url" className="text-sm font-medium">
            Image URL
          </label>
          <Input
            id="image-url"
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <Button
          onClick={handleAddPhoto}
          disabled={!imageUrl.trim() || currentSrc === imageUrl}
        >
          {currentSrc ? 'Change Photo' : 'Add Photo'}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
}
