import ContentTittle from "@/components/content_tittle.jsx";
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
export default function breakcookie() {
  let table = new DataTable('#myTable', {
    // config options...

    responsive: true
});

  return (  
      <div>
        <ContentTittle name='asdasdsa'/>
      <p>this test content login</p>
    </div>
    );
  }
  