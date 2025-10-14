import { useState, useEffect } from 'react'
import './WalletModal.css'
import { trackWalletOpen } from '../services/achievementService'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentTab = 'gcash' | 'wise'

function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>('gcash')

  useEffect(() => {
    if (isOpen) {
      // Track wallet open achievement (only triggers once)
      trackWalletOpen()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="wallet-modal-overlay" onClick={onClose}>
      <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Buy me a coffee?</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="wallet-tabs">
          <button
            className={`wallet-tab ${activeTab === 'gcash' ? 'active' : ''}`}
            onClick={() => setActiveTab('gcash')}
          >
            📱 GCash
          </button>
          <button
            className={`wallet-tab ${activeTab === 'wise' ? 'active' : ''}`}
            onClick={() => setActiveTab('wise')}
          >
            🌍 Wise
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'gcash' && (
            <div className="payment-section">
              <h3 className="payment-title">Send via GCash</h3>
              <p className="payment-description">
                Scan the QR code below using your GCash app to send support. Every little bit helps! ☕
              </p>
              <div className="qr-code-container">
                <img
                  src="/gcash.jpg"
                  alt="GCash QR Code"
                  className="qr-code-image"
                />
              </div>
              <p className="payment-note">
                For Philippine-based supporters
              </p>
            </div>
          )}

          {activeTab === 'wise' && (
            <div className="payment-section">
              <h3 className="payment-title">Send via Wise</h3>
              <p className="payment-description">
                International supporters can send via Wise with zero fees for many countries. 🌎
              </p>
              <div className="wise-button-container">
                <a
                  href="https://wise.com/pay/me/victorzyonposadast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wise-button"
                >
                  <svg
                    className="wise-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                  </svg>
                  Send via Wise
                </a>
              </div>
              <p className="payment-note">
                For international supporters • Zero fees for many countries
              </p>
            </div>
          )}

          <div className="wallet-footer">
            <p className="thank-you-message">
              Thank you for your support! Your generosity helps me continue building awesome projects. 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
