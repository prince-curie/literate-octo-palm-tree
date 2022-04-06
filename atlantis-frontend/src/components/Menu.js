import Card from "./Card";
import DragAndDropSection from "./DragAndDropSection";
import Header from "./Header";
import Loading from "./Helper/Loading";
import WalletButton from "./WalletButton";
function Menu() {
  return (
    <div className="menu">
      <Header />
      <WalletButton />
      <div className="menu-analysis">
        <p>LOYALTY ANALYSIS</p>
        
          <Card />
      
      </div>
      <DragAndDropSection />
     
    </div>
  );
}

export default Menu;
