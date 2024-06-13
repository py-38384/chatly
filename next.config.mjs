/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com'
            },
            {
                hostname: 'lh3.googleusercontent.com'
            },
            {
                hostname: 'avatars.githubusercontent.com'
            },
        ]
    }
};

export default nextConfig;
