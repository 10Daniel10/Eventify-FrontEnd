import { HeadCustom } from "eventapp/components/layout/HeadCustom";
import { Layout } from "eventapp/components/layout/Layout";
import { AddForm } from "eventapp/components/providers/AddForm";
import { NextPage } from "next";

const AddProduct: NextPage = () => {
    


    return(
        <> 
            <HeadCustom title="add" />
            <Layout variant='navigation'>
                <AddForm />
            </Layout>                   
        </>
    );
}

export default AddProduct;