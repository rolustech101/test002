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

global $app_strings;

$menuDef['sugarPerson'] = array(
    array('text' => 'LBL_ADD_TO_FAVORITES', 
          'action' => 'SUGAR.contextMenu.actions.addToFavorites'),
    array('text' => 'LBL_CREATE_NOTE', 
          'action' => 'SUGAR.contextMenu.actions.createNote',
          'module' => 'Notes',
          'aclAction' => 'edit'),
    array('text' => 'LBL_CREATE_TASK', 
          'action' => 'SUGAR.contextMenu.actions.createTask',
          'module' => 'Tasks',
          'aclAction' => 'edit'),
    array('text' => 'LBL_SCHEDULE_MEETING', 
          'action' => 'SUGAR.contextMenu.actions.scheduleMeeting',
          'module' => 'Meetings',
          'aclAction' => 'edit'),
    array('text' => 'LBL_SCHEDULE_CALL', 
          'action' => 'SUGAR.contextMenu.actions.scheduleCall',
          'module' => 'Calls',
          'aclAction' => 'edit'),
    );

?>