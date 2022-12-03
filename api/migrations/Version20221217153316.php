<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221217153316 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE file_report_file_field (id VARCHAR(255) NOT NULL, report_file_field_id VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A1B6C22C7CBAC95D ON file_report_file_field (report_file_field_id)');
        $this->addSql('COMMENT ON COLUMN file_report_file_field.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN file_report_file_field.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN file_report_file_field.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE rcd_checklist (id VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE rcd_issue (id VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE rcd_note (id VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE rcd_record (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, entity_type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN rcd_record.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN rcd_record.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN rcd_record.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, is_archived BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, entity_type VARCHAR(255) NOT NULL, filter JSON DEFAULT NULL, published_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, supporting_text VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN report.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report.published_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_field (id VARCHAR(255) NOT NULL, section_id VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, report_field_type VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, sort_order INT NOT NULL, entity_type VARCHAR(255) NOT NULL, text_value VARCHAR(64000) DEFAULT NULL, filter JSON DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_71E94221D823E37A ON report_field (section_id)');
        $this->addSql('COMMENT ON COLUMN report_field.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_field_type (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE report_field_type_component (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE report_section (id VARCHAR(255) NOT NULL, report_id VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, sort_order INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4DEA07EF4BD2A4C0 ON report_section (report_id)');
        $this->addSql('COMMENT ON COLUMN report_section.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_section.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_section.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_selectable_field_option (id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, is_selected BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE file_report_file_field ADD CONSTRAINT FK_A1B6C22C7CBAC95D FOREIGN KEY (report_file_field_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rcd_checklist ADD CONSTRAINT FK_9862704BBF396750 FOREIGN KEY (id) REFERENCES rcd_record (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rcd_issue ADD CONSTRAINT FK_30965E52BF396750 FOREIGN KEY (id) REFERENCES rcd_record (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rcd_note ADD CONSTRAINT FK_F6D62FA2BF396750 FOREIGN KEY (id) REFERENCES rcd_record (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_field ADD CONSTRAINT FK_71E94221D823E37A FOREIGN KEY (section_id) REFERENCES report_section (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_section ADD CONSTRAINT FK_4DEA07EF4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE file_report_file_field DROP CONSTRAINT FK_A1B6C22C7CBAC95D');
        $this->addSql('ALTER TABLE rcd_checklist DROP CONSTRAINT FK_9862704BBF396750');
        $this->addSql('ALTER TABLE rcd_issue DROP CONSTRAINT FK_30965E52BF396750');
        $this->addSql('ALTER TABLE rcd_note DROP CONSTRAINT FK_F6D62FA2BF396750');
        $this->addSql('ALTER TABLE report_field DROP CONSTRAINT FK_71E94221D823E37A');
        $this->addSql('ALTER TABLE report_section DROP CONSTRAINT FK_4DEA07EF4BD2A4C0');
        $this->addSql('DROP TABLE file_report_file_field');
        $this->addSql('DROP TABLE rcd_checklist');
        $this->addSql('DROP TABLE rcd_issue');
        $this->addSql('DROP TABLE rcd_note');
        $this->addSql('DROP TABLE rcd_record');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE report_field');
        $this->addSql('DROP TABLE report_field_type');
        $this->addSql('DROP TABLE report_field_type_component');
        $this->addSql('DROP TABLE report_section');
        $this->addSql('DROP TABLE report_selectable_field_option');
    }
}
