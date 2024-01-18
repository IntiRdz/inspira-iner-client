export default function CardMedium({ data }) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Detalle del Objeto
            </div>
            <div className="block mt-1 text-lg leading-tight font-medium text-black">
              {Object.entries(data).map(([key, value]) => (
                <p key={key} className="mt-2 text-gray-500">
                  {key}: {JSON.stringify(value)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  