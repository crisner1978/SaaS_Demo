import Image from 'next/image'
import { createServerClient, getProduct } from '../../../../supabase'
import ReactVideo from '../../../core/components/ReactVideo'
import PromoCard from '../../../products/components/PromoCard'
import SubscriberCard from '../../../products/components/SubscriberCard'

export default async function ProductPage({ params }) {
  const product = await getProduct({ slug: params.slug })
  const supabase = createServerClient()

  const { data: productContent } = await supabase
    .from('product_content')
    .select('*')
    .eq('id', product.product_content_id)
    .single()

  const { data: session } = await supabase.auth.getSession()

  return (
    <section className='product-section'>
      <article className='product'>
        <div className='product-wrap'>
          {productContent?.download_url && (
            <a
              href={`/assets/${productContent.download_url}`}
              download
              className='download-link large-button'>
              <span className='large-button-text'>Download</span>
            </a>
          )}
          {productContent?.video_url ? (
            <ReactVideo url={productContent.video_url} />
          ) : (
            <Image
              width={1000}
              height={1000}
              src={`/assets/${product.slug}.png`}
              alt={product.name}
            />
          )}
        </div>
        <section>
          <header>
            <h3>{product.name}</h3>
          </header>
          <section>
            <div>
              <p>{product.description}</p>
            </div>
          </section>
        </section>
        <section>{session ? <SubscriberCard /> : <PromoCard />}</section>
      </article>
    </section>
  )
}
