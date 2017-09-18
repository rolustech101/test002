<?php
 // created: 2017-09-18 15:53:35
$layout_defs["key_teacher"]["subpanel_setup"]['key_student_key_teacher'] = array (
  'order' => 100,
  'module' => 'key_student',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_KEY_STUDENT_KEY_TEACHER_FROM_KEY_STUDENT_TITLE',
  'get_subpanel_data' => 'key_student_key_teacher',
  'top_buttons' => 
  array (
    0 => 
    array (
      'widget_class' => 'SubPanelTopButtonQuickCreate',
    ),
    1 => 
    array (
      'widget_class' => 'SubPanelTopSelectButton',
      'mode' => 'MultiSelect',
    ),
  ),
);
