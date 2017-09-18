<?php
// created: 2017-09-18 15:53:35
$dictionary["key_course"]["fields"]["key_teacher_key_course"] = array (
  'name' => 'key_teacher_key_course',
  'type' => 'link',
  'relationship' => 'key_teacher_key_course',
  'source' => 'non-db',
  'module' => 'key_teacher',
  'bean_name' => 'key_teacher',
  'side' => 'right',
  'vname' => 'LBL_KEY_TEACHER_KEY_COURSE_FROM_KEY_COURSE_TITLE',
  'id_name' => 'key_teacher_key_coursekey_teacher_ida',
  'link-type' => 'one',
);
$dictionary["key_course"]["fields"]["key_teacher_key_course_name"] = array (
  'name' => 'key_teacher_key_course_name',
  'type' => 'relate',
  'source' => 'non-db',
  'vname' => 'LBL_KEY_TEACHER_KEY_COURSE_FROM_KEY_TEACHER_TITLE',
  'save' => true,
  'id_name' => 'key_teacher_key_coursekey_teacher_ida',
  'link' => 'key_teacher_key_course',
  'table' => 'key_teacher',
  'module' => 'key_teacher',
  'rname' => 'name',
);
$dictionary["key_course"]["fields"]["key_teacher_key_coursekey_teacher_ida"] = array (
  'name' => 'key_teacher_key_coursekey_teacher_ida',
  'type' => 'id',
  'source' => 'non-db',
  'vname' => 'LBL_KEY_TEACHER_KEY_COURSE_FROM_KEY_COURSE_TITLE_ID',
  'id_name' => 'key_teacher_key_coursekey_teacher_ida',
  'link' => 'key_teacher_key_course',
  'table' => 'key_teacher',
  'module' => 'key_teacher',
  'rname' => 'id',
  'reportable' => false,
  'side' => 'right',
  'massupdate' => false,
  'duplicate_merge' => 'disabled',
  'hideacl' => true,
);

