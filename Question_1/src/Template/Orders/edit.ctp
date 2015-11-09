
<h1>Pizza Info</h1>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('List Orders'), ['action' => 'index']) ?></li>
		<li><?= $this->Html->link(__('Logout'), array('controller'=>'users', 'action'=>'login')) ?></li>
    </ul>
</nav>
<div class="orders form large-9 medium-8 columns content">
    <?= $this->Form->create($order) ?>
    <fieldset>
        <legend><?= __('Edit Order') ?></legend>
        <?php
   
   echo $this->Form->label('Select pizza size');
    
	$options = array(
	'small'=>'Small',
    'medium'=>'Medium',
	'large'=>'Large',
	'xlarge'=>'XLarge'
);

$attributes = array(
    'legend' => false
);

echo $this->Form->radio('size', $options, $attributes);
 
	
   echo $this->Form->label('Select crust type');
   
   $options1 = array(
	  'handtossed' => 'Hand-tossed',
      'pan' => 'Pan',
      'stuffed' => 'Stuffed',
	  'thin' => 'Thin'
);

$attributes1 = array(
    'legend' => false
);

echo $this->Form->radio('crust', $options1, $attributes1);
 
      $options2 = array(
	                  'mushroom' => 'Mushroom',
				'greenolives' => 'Green Olives',
				'salami' => 'Salami',
				'bacon' => 'Bacon',
				'spinach' => 'Spinach',
				'fetacheese' => 'Feta Cheese',
				'pepporoni' => 'Pepporoni',
				'blackolives' => 'Black Olives',
                'smokedham' => 'Smoked Ham',
                'groundbeef' => 'Ground Beef'
);

	  echo $this->Form->input('topping',array(
        'label' => __('Select toppings',true),
        'type' => 'select',
        'multiple' => 'checkbox',
        'options' => $options2,
    ));
	
        ?>
    </fieldset>
    <?=$this->Form->button(__('Save Order'));?>
    <?= $this->Form->end() ?>
</div>
