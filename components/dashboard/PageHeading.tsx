export default function PageHeading({header, description}: {header: string, description: string}) {
    return(
        <div className="animateDown border-b border-body">
            <div className="2xl:text-5xl text-4xl font-medium mb-4">{header}</div>
            <div className="text-body 2xl:text-lg mb-2">{description}</div>
        </div>
    );
}