'use client';

import { useRef, type ChangeEvent } from 'react';
import { UploadIcon } from '@/shared/components/icons/upload';
import { OrderDocumentItem } from './order-document-item';
import { Button } from '@/shared/components/ui/actions/button';
import { ORDER_DOCUMENT_ACCEPT } from '@/shared/constants/documents';
import type { OrderDocumentEntry } from '@/types/orders';

type OrderDocumentsSectionProps = {
  documents: OrderDocumentEntry[];
  isUploading: boolean;
  onUpload: (file: File) => Promise<void>;
  onDelete: (documentId: string) => void;
};

export function OrderDocumentsSection(props: OrderDocumentsSectionProps) {
  const { documents, isUploading, onUpload, onDelete } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelectDocument() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    void onUpload(file);
    event.target.value = '';
  }

  return (
    <section>
      <div>
        <h2 className="font-semibold">Файлы и документы</h2>
        <p className="text-muted-foreground mt-1 text-xs">PDF до 5 МБ</p>
      </div>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={ORDER_DOCUMENT_ACCEPT}
        onChange={handleFileChange}
      />

      <div className="mt-3 flex items-start gap-4 overflow-x-auto pb-2">
        <Button
          type="button"
          variant="outline"
          Icon={UploadIcon}
          isLoading={isUploading}
          onClick={handleSelectDocument}
          className="border-primary text-primary bg-surface/60 h-10 shrink-0 gap-1.5 border-dashed px-3 text-sm backdrop-blur-md xl:h-11 xl:gap-2 xl:px-4"
        >
          Загрузить файл
        </Button>

        <ul className="contents">
          {documents.map((document) => (
            <OrderDocumentItem key={document.id} document={document} onDelete={onDelete} />
          ))}
        </ul>
      </div>
    </section>
  );
}
