export default function UserCard({ value, href, timestamp }
: { value: string, href: string, timestamp: number }) {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md shadow-sm">
      <p>
        <span className="font-bold">Username: </span>
        {value}
      </p>
      <p>
        <span className="font-bold">Link account: </span>
        <a className="underline text-blue-900 visited:text-purple-900" href={ href }>
          {href.split('www.')[1]}
        </a>
      </p>
      <p>
        <span className="font-bold">Date: </span>
        {new Date(timestamp * 1000).toLocaleString().split(',').reverse()
          .join(' - ')}
      </p>
    </div>
  );
}
