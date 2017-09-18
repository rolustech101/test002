<?php
// created: 2017-09-18 15:53:35
$dictionary["key_teacher_key_course"] = array (
  'true_relationship_type' => 'one-to-many',
  'relationships' => 
  array (
    'key_teacher_key_course' => 
    array (
      'lhs_module' => 'key_teacher',
      'lhs_table' => 'key_teacher',
      'lhs_key' => 'id',
      'rhs_module' => 'key_course',
      'rhs_table' => 'key_course',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'key_teacher_key_course_c',
      'join_key_lhs' => 'key_teacher_key_coursekey_teacher_ida',
      'join_key_rhs' => 'key_teacher_key_coursekey_course_idb',
    ),
  ),
  'table' => 'key_teacher_key_course_c',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'type' => 'id',
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'type' => 'datetime',
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'type' => 'bool',
      'default' => 0,
    ),
    'key_teacher_key_coursekey_teacher_ida' => 
    array (
      'name' => 'key_teacher_key_coursekey_teacher_ida',
      'type' => 'id',
    ),
    'key_teacher_key_coursekey_course_idb' => 
    array (
      'name' => 'key_teacher_key_coursekey_course_idb',
      'type' => 'id',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'key_teacher_key_coursespk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'key_teacher_key_course_ida1',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'key_teacher_key_coursekey_teacher_ida',
      ),
    ),
    2 => 
    array (
      'name' => 'key_teacher_key_course_alt',
      'type' => 'alternate_key',
      'fields' => 
      array (
        0 => 'key_teacher_key_coursekey_course_idb',
      ),
    ),
  ),
);