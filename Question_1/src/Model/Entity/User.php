<?php
namespace App\Model\Entity;

use Cake\Auth\DefaultPasswordHasher;
use Cake\ORM\Entity;


/**
 * User Entity.
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $role
 * @property string $street
 * @property string $city
 * @property string $postalCode
 * @property string $province
 * @property string $email
 * @property int $phone
 */
class User extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
     protected $_accessible = [
        '*' => true,
        'id' => false
    ];
	
	protected function _setPassword($password)
    {
        return (new DefaultPasswordHasher)->hash($password);
    }


}
