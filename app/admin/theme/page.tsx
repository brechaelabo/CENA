/* app/admin/theme/page.tsx */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // ← já existe no template
import { Button } from "@/components/ui/button"; // estilo Shadcn

export default function AdminThemePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
  const [pdfLinks, setPdfLinks] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  // handle change for pdf link i-ésimo
  const updatePdfLink = (index: number, value: string) => {
    const copy = [...pdfLinks];
    copy[index] = value;
    setPdfLinks(copy);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          headerImageUrl,
          youtubeEmbedUrl,
          monologuePdfs: pdfLinks.filter((l) => l.trim() !== ""),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setMessage("✅ Tema salvo com sucesso!");
      // opcional: limpar formulário
      setTitle("");
      setDescription("");
      setHeaderImageUrl("");
      setYoutubeEmbedUrl("");
      setPdfLinks(["", "", "", "", ""]);

      // recarrega dados ou redireciona
      router.refresh();
    } catch (err) {
      setMessage("❌ Erro ao salvar o tema.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6">Configurar Tema do Mês</h1>

      {message && <p className="mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Descrição */}
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* Imagem de cabeçalho */}
        <div>
          <Label htmlFor="headerImageUrl">URL da imagem de cabeçalho</Label>
          <Input
            id="headerImageUrl"
            value={headerImageUrl}
            onChange={(e) => setHeaderImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        {/* Vídeo YouTube */}
        <div>
          <Label htmlFor="youtube">URL embed do YouTube</Label>
          <Input
            id="youtube"
            value={youtubeEmbedUrl}
            onChange={(e) => setYoutubeEmbedUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>

        {/* PDFs dos monólogos */}
        <div>
          <Label>Links para PDFs (até 5)</Label>
          <div className="space-y-2">
            {pdfLinks.map((link, idx) => (
              <Input
                key={idx}
                value={link}
                onChange={(e) => updatePdfLink(idx, e.target.value)}
                placeholder={`PDF ${idx + 1} - https://...`}
              />
            ))}
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Tema"}
        </Button>
      </form>
    </div>
  );
}
