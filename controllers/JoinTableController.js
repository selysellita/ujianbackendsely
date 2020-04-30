const {db}=require('./../connections')     

module.exports={
    listinventory:(req,res)=>{
        var sql=`select p.nama as "Product", s.branch_name as "Branch Name", i.inventory as "Stock" from inventory i
        join store s on i.store_id=s.store_id
        join product p on i.product_id=p.product_id`
        db.query(sql,(err1,inventory)=>{
            if(err1) return res.status(500).send(err1)
            sql=`Select product_id, nama from product`
            db.query(sql,(err,product)=>{
                if(err) return res.status(500).send(err)
                sql=`Select store_id, branch_name from store`
                db.query(sql,(err,branchstore)=>{
                if(err) return res.status(500).send(err)
                return res.status(200).send({inventory,product,branchstore})
                })               
            })     
        })
    }
}