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

use Sugarcrm\Sugarcrm\Security\InputValidation\Request;

/**
 * ContactsViewContactAddressPopup
 * 
 * */
 
require_once('include/MVC/View/SugarView.php');
require_once('modules/Contacts/Popup_picker.php');

class ContactsViewContactAddressPopup extends SugarView {

    /**
     * @deprecated Use __construct() instead
     */
    public function ContactsViewContactAddressPopup()
    {
        self::__construct($bean, $view_object_map, $request);
    }

    public function __construct($bean = null, $view_object_map = array(), Request $request = null)
    {
        parent::__construct($bean, $view_object_map, $request);
    }

 	function process() {
		$this->display();
 	}

 	function display() {
 		$this->renderJavascript();
 		$popup = new Popup_Picker();
		echo $popup->process_page_for_address();
 	}	
}
