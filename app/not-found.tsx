import Image from 'next/image'

export default function NotFound() {
  return (
    <section>
      <div className="flex justify-center">
        <Image
          src="/images/404.png"
          width={300}
          height={300}
          alt="404"
          className="h-auto max-w-full"
        />
      </div>
    </section>
  )
}
