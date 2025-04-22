import Image from 'next/image';

export function WorkflowDiagram() {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Workflow</h2>
      <div className="relative w-full aspect-[16/9] bg-white rounded-lg shadow-lg overflow-hidden">
        <Image
          src="/workflow.png"
          alt="PDF Processing Workflow Diagram"
          fill
          className="object-contain p-4"
          priority
        />
      </div>
    </div>
  );
} 