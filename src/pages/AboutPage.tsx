export default function AboutPage() {
  return <>
    <section className="page-section px-2 background-color-overlay">
      <div className="container mt-5">

        <div className="row bg-dark py-3 p-2 p-md-4 bg-opacity-75 mt-5">
          <div className="col-md-6">
            <h6 className="pb-2">Om oss</h6>
            <div className="d-flex flex-column justify-content-center">
              <h3 className="pb-2" >Tusentals timmar ljud levererade till nöjda kunder</h3>
              <p className="text-light">
                Oavsett om det gäller en fest, konferens eller konsert kan du lita på oss för utrustning och support som fungerar.
              </p>
              <p className="text-light">
                Våra kollegor arbetar tätt tillsammans för att planera och genomföra varje projekt på ett tryggt och effektivt sätt.
                Med ett engagerat team som brinner för ljud och service kan vi leverera lösningar som gör skillnad för våra kunder.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <img src="images/team.jpg" className="w-100" />
          </div>
        </div>
      </div >

      <div className="my-3"> </div>
    </section >
  </>;
}
