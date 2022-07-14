import ContentLoader from "react-content-loader"

const Loader = () => {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={500}
            viewBox="0 0 280 500"
            backgroundColor="#fbf3f3"
            foregroundColor="#cecaca"
        >
            <rect x="329" y="259" rx="5" ry="5" width="131" height="18" />
            <rect x="284" y="197" rx="8" ry="8" width="141" height="58" />
            <circle cx="130" cy="130" r="130" />
            <rect x="5" y="272" rx="19" ry="19" width="250" height="33" />
            <rect x="0" y="312" rx="13" ry="13" width="267" height="88" />
            <rect x="4" y="421" rx="11" ry="11" width="101" height="30" />
            <rect x="140" y="417" rx="20" ry="20" width="122" height="47" />
        </ContentLoader>
    )
}

export default Loader
