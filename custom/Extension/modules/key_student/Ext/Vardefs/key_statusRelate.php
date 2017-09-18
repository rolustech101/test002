<?php
$dictionary['key_student']['fields']['key_status_name'] = array(
    'required'  => false,
    'source'    => 'non-db',
    'name'      => 'key_status_name',
    'vname'     => 'LBL_KEY_STATUS_NAME',
    'type'      => 'relate',
    'rname'     => 'name',
    'id_name'   => 'key_status_id',
    'join_name' => 'key_status',
    'link'      => 'key_status',
    'table'     => 'key_status',
    'isnull'    => 'true',
    'module'    => 'key_status',
    );
$dictionary['key_student']['fields']['key_status_id'] = array(
    'name'              => 'key_status_id',
    'rname'             => 'id',
    'vname'             => 'LBL_KEY_STATUS_ID',
    'type'              => 'id',
    'table'             => 'key_status',
    'isnull'            => 'true',
    'module'            => 'key_status',
    'dbType'            => 'id',
    'reportable'        => false,
    'massupdate'        => false,
    'duplicate_merge'   => 'disabled',
    );
$dictionary['key_student']['fields']['key_status'] = array(
    'name'          => 'key_status',
    'type'          => 'link',
    'relationship'  => 'key_student_key_status',
    'module'        => 'key_status',
    'bean_name'     => 'key_status',
    'source'        => 'non-db',
    'vname'         => 'LBL_KEY_STATUS',
    );
$dictionary['key_student']['relationships']['key_student_key_status'] = array(
    'lhs_module'        => 'key_student',
    'lhs_table'         => 'key_student',
    'lhs_key'           => 'subscriber_id',
    'rhs_module'        => 'key_status',
    'rhs_table'         => 'key_status',
    'rhs_key'           => 'id',
    'relationship_type' => 'one-to-many',
    );