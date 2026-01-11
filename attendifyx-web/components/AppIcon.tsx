import Image from 'next/image';

const AppIcon = ({
                     size = 24,
                     className = ""
                 }: {
    size?: number;
    className?: string;
}) => {
    return (
        <div
            className={`relative inline-block overflow-hidden ${className}`}
            style={{width: size, height: size}}
        >
            <Image
                src="/app-logo.png"
                alt="icon"
                fill
                sizes={`${size}px`}
                className="object-contain"
                priority={false}
            />
        </div>
    );
};

export default AppIcon;