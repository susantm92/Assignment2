<?php

namespace App\Controller;

class OrdersController extends AppController
{

    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('Flash'); // Include the FlashComponent
    }
	
    public function index()
    {
        $orders = $this->Paginate($this->Orders->find('all'));
        $this->set(compact('orders'));
    }
	 public function view($id)
    {
        $orders = $this->Orders->get($id);
        $this->set(compact('order'));
    }

    public function add()
    {
        $order = $this->Orders->newEntity();
        if ($this->request->is('post')) {
            $order = $this->Orders->patchEntity($order, $this->request->data);
			//implode(',',$_POST['topping']);
           
		   $toppingNumber=0;
		   $crustCost=0;
		   $sizeCost=0;
		   $toppingCost=0;
		   $totalCost=0;
		   
		   if($this->request->data['size']=='small')
		   {
			   $sizeCost=5;
		   }
		   else if($this->request->data['size']=='medium')
		   {
			   $sizeCost=10;
		   }
		   else if($this->request->data['size']=='large')
		   {
			   $sizeCost=15;
		   }
		   else if($this->request->data['size']=='xlarge')
		   {
			   $sizeCost=20;
		   }
		   else
		   {
			   $sizeCost=0;
		   }
		   
		   if($this->request->data['crust']=='stuffed')
		   {
			   $crustCost=2;
		   }
		   else
		   {
			   $sizeCost=0;
		   }
		   
		  // $model = ucfirst(Inflector::singularize($this->params['OrdersController']));
		   $alltoppings="";
            foreach( $this->request->data['topping'] as $checkboxes) 
			{
                 $alltoppings.= $checkboxes ."   ";
				 $toppingNumber=$toppingNumber+1;
            }
		   $order->topping = $alltoppings;
		   
		   $totalCost=$crustCost+$sizeCost+($toppingNumber-1)*0.50;
		   $order->cost=$totalCost;
          
		  $order->userId = $this->Auth->user('id');
        // You could also do the following
        //$newData = ['user_id' => $this->Auth->user('id')];
        //$article = $this->Orders->patchEntity($order, $newData);

            if ($this->Orders->save($order)) {
                $this->Flash->success(__('Your order has been saved.'));
                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('Unable to add your order.'));
        }
		
        $this->set('order', $order);
    }
	public function edit($id = null)
	{
		$order = $this->Orders->get($id);
		if ($this->request->is(['post', 'put'])) {
			$this->Orders->patchEntity($order, $this->request->data);
			if ($this->Orders->save($order)) {
				$this->Flash->success(__('Your order has been updated.'));
				return $this->redirect(['action' => 'index']);
			}
			$this->Flash->error(__('Unable to update your article.'));
		}

		$this->set('order', $order);
	}
	public function delete($id)
   {
			$this->request->allowMethod(['post', 'delete']);

			$order = $this->Orders->get($id);
			if ($this->Orders->delete($order)) {
				$this->Flash->success(__('The order with id: {0} has been deleted.', h($id)));
				return $this->redirect(['action' => 'index']);
			}
    }
	
}

?>