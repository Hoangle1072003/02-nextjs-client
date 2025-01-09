import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'salt.tikicdn.com',
                port: '',
                search: '',
            },
        ],
    },
};


export default nextConfig;
