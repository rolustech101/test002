<?php
 // created: 2017-09-18 15:53:35
$layout_defs["key_teacher"]["subpanel_setup"]['key_teacher_key_course'] = array (
  'order' => 100,
  'module' => 'key_course',
  'subpanel_name' => 'default',
  'sort_order' => 'asc',
  'sort_by' => 'id',
  'title_key' => 'LBL_KEY_TEACHER_KEY_COURSE_FROM_KEY_COURSE_TITLE',
  'get_subpanel_data' => 'key_teacher_key_course',
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
