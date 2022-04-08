import Card from "./Card";
import DragAndDropSection from "./DragAndDropSection";
import Header from "./Header";
import WalletButton from "./WalletButton";
import AddAdminForm from "./AddAdminForm";
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
      <AddAdminForm />
    </div>
  );
}

export default Menu;
