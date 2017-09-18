<?php

$dictionary["key_student_key_course"] = array (
  'true_relationship_type' => 'many-to-many',
  'relationships' => 
  array (
    'key_student_key_course' => 
    array (
      'lhs_module' => 'key_student',
      'lhs_table' => 'key_student',
      'lhs_key' => 'id',
      'rhs_module' => 'key_course',
      'rhs_table' => 'key_course',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'key_student_key_course_c',
      'join_key_lhs' => 'key_student_key_coursekey_student_ida',
      'join_key_rhs' => 'key_student_key_coursekey_course_idb',
    ),
  ),
  'table' => 'key_student_key_course_c',
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
    'key_student_key_coursekey_student_ida' => 
    array (
      'name' => 'key_student_key_coursekey_student_ida',
      'type' => 'id',
    ),
    'key_student_key_coursekey_course_idb' => 
    array (
      'name' => 'key_student_key_coursekey_course_idb',
      'type' => 'id',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'key_student_key_coursespk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'key_student_key_course_alt',
      'type' => 'alternate_key',
      'fields' => 
      array (
        0 => 'key_student_key_coursekey_student_ida',
        1 => 'key_student_key_coursekey_course_idb',
      ),
    ),
  ),
);