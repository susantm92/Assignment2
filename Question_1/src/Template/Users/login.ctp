<link rel="stylesheet" href="../css/form.css" />
<div class="users form" id="login">
<?= $this->Flash->render('auth') ?>
<?= $this->Form->create() ?>

    <fieldset>
        <legend><?= __('Please enter your username and password') ?></legend>
        <?= $this->Form->input('username') ?>
        <?= $this->Form->input('password') ?>
    </fieldset>
<?= $this->Form->button(__('Login')); ?>
<?= $this->Html->link('New User', ['action' => 'add']) ?>
<?= $this->Form->end() ?>
</div>