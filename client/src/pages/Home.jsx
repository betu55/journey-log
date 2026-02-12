import PlaceCard from "../components/PlaceCard";

function Home(){
  return (
    <div className="page container">
      <h1>Home Page</h1>
      <div className="place-list">
        <PlaceCard
          placeName="Test Place"
          location="Tokyo, Japan"
          dateVisited="2023-05-15"
          rating={4}
          description="An iconic symbol of France with stunning views of Paris."
          imageUrl="https://images.unsplash.com/photo-1594311879147-c172ced24621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwdGVtcGxlfGVufDF8fHx8MTc3MDEwODk3MXww&ixlib=rb-4.1.0&q=80&w=1080"
        />
        <PlaceCard
          placeName="Test Place"
          location="Tokyo, Japan"
          dateVisited="2023-05-15"
          rating={4}
          description="An iconic symbol of France with stunning views of Paris."
          imageUrl="https://images.unsplash.com/photo-1594311879147-c172ced24621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwdGVtcGxlfGVufDF8fHx8MTc3MDEwODk3MXww&ixlib=rb-4.1.0&q=80&w=1080"
        />
        <PlaceCard
          placeName="Test Place"
          location="Tokyo, Japan"
          dateVisited="2023-05-15"
          rating={4}
          description="An iconic symbol of France with stunning views of Paris."
          imageUrl="https://images.unsplash.com/photo-1594311879147-c172ced24621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwdGVtcGxlfGVufDF8fHx8MTc3MDEwODk3MXww&ixlib=rb-4.1.0&q=80&w=1080"
        />
        <PlaceCard
          placeName="Test Place"
          location="Tokyo, Japan"
          dateVisited="2023-05-15"
          rating={4}
          description="An iconic symbol of France with stunning views of Paris."
          imageUrl="https://images.unsplash.com/photo-1594311879147-c172ced24621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwdGVtcGxlfGVufDF8fHx8MTc3MDEwODk3MXww&ixlib=rb-4.1.0&q=80&w=1080"
        />
      </div>
    </div>
  );
}

export default Home