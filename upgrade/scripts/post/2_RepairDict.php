<?php
 if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
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

/**
 * There were some scenarios in 6.0.x whereby the files loaded in the extension tabledictionary.ext.php file
 * did not exist.  This would cause warnings to appear during the upgrade.  As a result, this
 * function scans the contents of tabledictionary.ext.php and then remove entries where the file does exist.
 */
class SugarUpgradeRepairDict extends UpgradeScript
{
    public $order = 2000;
    public $type = self::UPGRADE_CUSTOM;

    public function run()
    {
        $tableDictionaryExtDirs = array('custom/Extension/application/Ext/TableDictionary',
            'custom/application/Ext/TableDictionary');

        foreach ($tableDictionaryExtDirs as $tableDictionaryExt) {
            if (is_dir($tableDictionaryExt) && is_writable($tableDictionaryExt)) {
                $files = $this->findFiles($tableDictionaryExt);
                foreach($files as $file) {
                    $entry = $tableDictionaryExt . '/' . $file;
                    if (is_file($entry) && preg_match('/\.php$/i', $entry) && is_writeable($entry)) {
                        $fp = fopen($entry, 'r');

                        if ($fp) {
                            $altered = false;
                            $contents = '';

                            while ($line = fgets($fp)) {
                                if (preg_match('/\s*include\s*\(\s*[\'|\"](.*?)[\"|\']\s*\)\s*;/', $line, $match)) {
                                    if (!file_exists($match[1])) {
                                        $altered = true;
                                    } else {
                                        $contents .= $line;
                                    }
                                } else {
                                    $contents .= $line;
                                }
                            }

                            fclose($fp);
                        }

                        if ($altered) {
                            file_put_contents($entry, $contents);
                        }
                    } // if
                } // while
            } // if
        }
    }
}
