const benefits = [
  {
    title: 'One low price',
    description: 'Save big. Get everything with a super low monthly subscription.',
  },
  {
    title: 'No limits',
    description: 'No limits. No restrictions. Complete access.',
  },
  {
    title: 'Cancel anytime',
    description: 'Cancel anytime. No questions asked.',
  },
]

export default function Benefits() {
  return (
    <div className="bg-black">
      <div className="column-padding">
        <div className="content-grid xl">
         {benefits.map((benefit) => (
            <BenefitItem key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </div>
  )
}


function BenefitItem({ title, description }) {
  return (
    <div className="spacing-base">
      <h3>
        {title}
        <br />
      </h3>
      <div>{description}</div>
    </div>
  )
}