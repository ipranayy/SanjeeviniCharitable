import React, { useState } from 'react';
import { FileText, Shield, Eye, Download } from 'lucide-react';

interface Document {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'on-request';
}

const documents: Document[] = [
  {
    title: "Trust Registration Certificate",
    description: "Official registration document under the Indian Trusts Act, confirming our legal status as a charitable organization.",
    icon: <FileText className="w-6 h-6" />,
    status: 'available'
  },
  {
    title: "Trust Deed",
    description: "Foundational document outlining our trust's objectives, governance structure, and operational guidelines.",
    icon: <Shield className="w-6 h-6" />,
    status: 'on-request'
  },
  {
    title: "12A Certificate",
    description: "Income Tax registration under Section 12A, validating our charitable status for tax purposes.",
    icon: <FileText className="w-6 h-6" />,
    status: 'available'
  },
  {
    title: "80G Certificate",
    description: "Certification enabling donors to claim tax deductions on contributions under Section 80G of the Income Tax Act.",
    icon: <FileText className="w-6 h-6" />,
    status: 'available'
  }
];

export default function LegalCompliance() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <section className="py-16 bg-pattern-1">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-12 h-12 text-white mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Legal & Compliance</h2>
            <p className="text-lg text-white/90 mb-8">
              At Sanjeevini Charitable Trust, we maintain the highest standards of transparency and legal compliance. 
              Our commitment to ethical practices and good governance ensures that your trust in us is well-placed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                onClick={() => setSelectedDoc(doc)}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-green-400">
                    {doc.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{doc.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{doc.description}</p>
                    <div className="flex items-center space-x-2">
                      {doc.status === 'available' ? (
                        <span className="inline-flex items-center text-sm text-green-400">
                          <Eye className="w-4 h-4 mr-1" />
                          Available for viewing
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-sm text-yellow-400">
                          <Download className="w-4 h-4 mr-1" />
                          Available upon request
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Document Access Note</h3>
            <p className="text-white/80">
              For security and privacy reasons, sensitive information in our documents has been redacted. 
              Full versions of these documents are available for legitimate verification purposes upon formal request. 
              Please contact our office with your requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}