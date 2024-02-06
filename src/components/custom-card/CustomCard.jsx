import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import a from "../../assets/watermelon.jpg";
function CustomCard({ ...item }) {
  item.thumbnail = "http://localhost:8001/" + item.thumbnail;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.thumbnail} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button className="" variant="primary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
