import Link from 'next/link';

const HomeLinks = ({ link, content }) => {
  return (
    <Link href={link} className="col-12 col-lg-4  row justify-content-center justify-content-lg-between" style={{ margin: "15px 0", textDecoration: "none", color: "white" }}>
      <div className="col-12 d-flex flex-column justify-content-around align-items-center" style={{ margin: "0", border: "1px solid black", borderRadius: "20px" }}>
        <p style={{ fontWeight: "700", fontSize: "20px" }}>{content.title}</p>
        {content.icon ? (
          <p style={{ fontWeight: "700", fontSize: "40px" }}>
            <i className={content.icon}></i>
          </p>
        ) : (
          <p style={{ fontWeight: "700", fontSize: "40px" }}>{content.content}</p>
        )}
      </div>
    </Link>
  )
}

export default HomeLinks;
