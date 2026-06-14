'use client'
import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CertificateButton({ totalHours, name }: { totalHours: number; name: string }) {
  const [loading, setLoading] = useState(false)

  async function generateCertificate() {
    if (totalHours < 5) {
      toast.error('You need at least 5 approved hours to generate a certificate')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/certificates')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Dynamically import jsPDF to avoid SSR issues
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

      const w = doc.internal.pageSize.getWidth()
      const h = doc.internal.pageSize.getHeight()

      // Background gradient simulation
      doc.setFillColor(255, 247, 237)
      doc.rect(0, 0, w, h, 'F')

      // Orange border
      doc.setDrawColor(249, 115, 22)
      doc.setLineWidth(3)
      doc.rect(8, 8, w - 16, h - 16, 'S')
      doc.setLineWidth(0.5)
      doc.rect(11, 11, w - 22, h - 22, 'S')

      // Header
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(249, 115, 22)
      doc.text('🪶 NAYEPANKH', w / 2, 28, { align: 'center' })

      doc.setFontSize(28)
      doc.setTextColor(31, 41, 55)
      doc.text('Certificate of Appreciation', w / 2, 50, { align: 'center' })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(12)
      doc.setTextColor(107, 114, 128)
      doc.text('This is to certify that', w / 2, 68, { align: 'center' })

      // Name
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(32)
      doc.setTextColor(249, 115, 22)
      doc.text(data.data.name, w / 2, 88, { align: 'center' })

      // Body
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(12)
      doc.setTextColor(55, 65, 81)
      doc.text(
        `has volunteered ${data.data.totalHours} hours with NayePankh, contributing to our mission of`,
        w / 2, 102, { align: 'center' }
      )
      doc.text('empowering underprivileged children through education, healthcare, and community support.', w / 2, 110, { align: 'center' })

      if (data.data.campaigns.length > 0) {
        doc.setFontSize(11)
        doc.setTextColor(107, 114, 128)
        doc.text(`Campaigns: ${data.data.campaigns.slice(0, 3).join(' • ')}`, w / 2, 122, { align: 'center' })
      }

      // Divider
      doc.setDrawColor(253, 186, 116)
      doc.setLineWidth(0.5)
      doc.line(40, 132, w - 40, 132)

      // Footer
      doc.setFontSize(11)
      doc.setTextColor(107, 114, 128)
      doc.text(`Issue Date: ${data.data.issueDate}`, 50, 148)
      doc.text(`Certificate ID: ${data.data.certificateId}`, w - 50, 148, { align: 'right' })

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(31, 41, 55)
      doc.text('NayePankh NGO', w / 2, 158, { align: 'center' })
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(156, 163, 175)
      doc.text('Authorized Signatory', w / 2, 165, { align: 'center' })

      doc.save(`NayePankh_Certificate_${data.data.name.replace(/\s+/g, '_')}.pdf`)
      toast.success('Certificate downloaded!')
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate certificate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={generateCertificate}
      disabled={loading || totalHours < 5}
      className="btn-outline flex items-center gap-2 disabled:opacity-40"
      title={totalHours < 5 ? 'Need 5+ approved hours' : 'Download certificate'}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      Certificate
    </button>
  )
}
