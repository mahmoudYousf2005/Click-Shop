/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.dummyjson.com" },
  ],
},
};

export default nextConfig;

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "fakestoreapi.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

// const nextConfig = {
//   images: {
//     domains: ["fakestoreapi.com"],
//   },
// };

// export default nextConfig;