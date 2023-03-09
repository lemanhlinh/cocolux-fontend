import Link from 'next/link';

const AboutPage = () => (
    <div>
        <h1>Hello About Page 👋</h1>

        <p>
            <Link href='/home-page' as='/'>
                <a>Home</a>
            </Link>
        </p>
    </div>
);

export default AboutPage;
