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

namespace Sugarcrm\Sugarcrm\Security\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 *
 * @see LegacyCleanStringValidator
 *
 */
class LegacyCleanString extends Constraint
{
    // Available filters
    const STANDARD = 'STANDARD';
    const STANDARDSPACE = 'STANDARDSPACE';
    const FILE = 'FILE';
    const NUMBER = 'NUMBER';
    const SQL_COLUMN_LIST = 'SQL_COLUMN_LIST';
    const PATH_NO_URL = 'PATH_NO_URL';
    const SAFED_GET = 'SAFED_GET';
    const UNIFIED_SEARCH = 'UNIFIED_SEARCH';
    const AUTO_INCREMENT = 'AUTO_INCREMENT';
    const ALPHANUM = 'ALPHANUM';

    // Error codes
    const FILTER_ERROR = 1;

    protected static $errorNames = array(
        self::FILTER_ERROR => 'FILTER_ERROR',
    );

    public $filter = self::STANDARD;
    public $message = 'LegacyCleanString violation [%filter%]';
}
