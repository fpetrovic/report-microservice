<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230112023834 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE report_field_file_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE report_file_field_file_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE file (id BIGINT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN file.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN file.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN file.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE record (id BIGINT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN record.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN record.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN record.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report (id BIGINT NOT NULL, name VARCHAR(255) NOT NULL, is_archived BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, entity_type VARCHAR(255) NOT NULL, config JSON DEFAULT NULL, published_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, supporting_text VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN report.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report.published_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_field (id BIGINT NOT NULL, section_id BIGINT DEFAULT NULL, name VARCHAR(255) NOT NULL, report_field_type VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, position INT NOT NULL, entity_type VARCHAR(255) NOT NULL, text_value VARCHAR(64000) DEFAULT NULL, filter JSON DEFAULT \'{}\', PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_71E94221D823E37A ON report_field (section_id)');
        $this->addSql('COMMENT ON COLUMN report_field.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_field.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_file_field_file (id BIGINT NOT NULL, report_file_id BIGINT DEFAULT NULL, file_id BIGINT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_85F0531F352046C ON report_file_field_file (report_file_id)');
        $this->addSql('CREATE INDEX IDX_85F053193CB796C ON report_file_field_file (file_id)');
        $this->addSql('COMMENT ON COLUMN report_file_field_file.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_file_field_file.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_file_field_file.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_section (id BIGINT NOT NULL, report_id BIGINT DEFAULT NULL, name VARCHAR(255) NOT NULL, position INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4DEA07EF4BD2A4C0 ON report_section (report_id)');
        $this->addSql('COMMENT ON COLUMN report_section.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_section.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_section.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE report_selectable_field_option (id BIGINT NOT NULL, report_selectable_field_id BIGINT DEFAULT NULL, name VARCHAR(255) NOT NULL, is_selected BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, position INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8E3A1D27A55D6AC7 ON report_selectable_field_option (report_selectable_field_id)');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN report_selectable_field_option.deleted_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE report_field ADD CONSTRAINT FK_71E94221D823E37A FOREIGN KEY (section_id) REFERENCES report_section (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_file_field_file ADD CONSTRAINT FK_85F0531F352046C FOREIGN KEY (report_file_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_file_field_file ADD CONSTRAINT FK_85F053193CB796C FOREIGN KEY (file_id) REFERENCES file (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_section ADD CONSTRAINT FK_4DEA07EF4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE report_selectable_field_option ADD CONSTRAINT FK_8E3A1D27A55D6AC7 FOREIGN KEY (report_selectable_field_id) REFERENCES report_field (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE report_file_field_file_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE report_field_file_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE report_field DROP CONSTRAINT FK_71E94221D823E37A');
        $this->addSql('ALTER TABLE report_file_field_file DROP CONSTRAINT FK_85F0531F352046C');
        $this->addSql('ALTER TABLE report_file_field_file DROP CONSTRAINT FK_85F053193CB796C');
        $this->addSql('ALTER TABLE report_section DROP CONSTRAINT FK_4DEA07EF4BD2A4C0');
        $this->addSql('ALTER TABLE report_selectable_field_option DROP CONSTRAINT FK_8E3A1D27A55D6AC7');
        $this->addSql('DROP TABLE file');
        $this->addSql('DROP TABLE record');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE report_field');
        $this->addSql('DROP TABLE report_file_field_file');
        $this->addSql('DROP TABLE report_section');
        $this->addSql('DROP TABLE report_selectable_field_option');
    }
}
