<?php
/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */





$dictionary['Lead'] = array(

    'fields' => array(

    'employe_id' => 
    array (
      'required' => false,
      'name' => 'employe_id',
      'vname' => 'LBL_EMPLOYE_ID',
      'type' => 'int',
      'importable' => 'true',
      'duplicate_merge' => 'enabled',
      'merge_filter' => 'disabled',
      'calculated' => false,
      'len' => '255',
      'size' => '20',
    ),

    'company_contact' => 
    array (
      'required' => false,
      'name' => 'company_contact',
      'vname' => 'LBL_COMPANY_CONTACT',
      'type' => 'phone',
      'massupdate' => false,
      'default' => '',
      'len' => '255',
      'size' => '20',
      'dbType' => 'varchar',
    ),

    'gender' => 
    array (
      'required' => false,
      'name' => 'gender',
      'vname' => 'LBL_GENDER',
      'type' => 'enum',
      'massupdate' => true,
      'default' => 'male',
      'no_default' => false,
      'len' => 100,
      'size' => '20',
      'options' => 'gender_list',
    ),

    'language' => 
    array (
      'required' => true,
      'name' => 'language',
      'vname' => 'LBL_LANGUAGE',
      'type' => 'enum',
      'massupdate' => true,
      'no_default' => true,
      'calculated' => false,
      'len' => 100,
      'size' => '20',
      'options' => 'available_language_dom',
    ),

    'joining_date' =>
     array(
        'name' => 'joining_date',
        'vname' => 'LBL_JOINING_DATE',
        'massupdate' => false,
        'type' => 'date',
        ),

    'company_email' =>
     array(
        'name' => 'company_email',
        'vname' => 'LBL_COMPANY_EMAIL',
        'type' => 'email',
        'len' => '100',
        'dbType' => 'varchar',

        ),

      ),

    'relationships' => array(),
    
);

