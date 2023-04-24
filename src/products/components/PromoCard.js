import Link from "next/link"

export default function PromoCard() {
  return (
    <section>
      <div>
        <div>
          <h4>Get Instant Access</h4>
          <p style={{ fontSize: '1rem' }}>
            Access this product plus dozens of others when uyou subscribe
          </p>
        </div>
      </div>
      <Link href='/pricing' className="primary button">
        Purchase
      </Link>
    </section>
  )
}
